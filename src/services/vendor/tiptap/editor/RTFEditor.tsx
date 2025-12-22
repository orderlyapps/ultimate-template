import { Editor, EditorContent, EditorContext, useEditor } from "@tiptap/react";
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { Toolbar } from "@tiptap-ui/components/tiptap-ui-primitive/toolbar";
import { ImageUploadNode } from "@tiptap-ui/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@tiptap-ui/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { handleImageUpload, MAX_FILE_SIZE } from "@tiptap-ui/lib/tiptap-utils";

import { RTFEditorToolbar } from "@services/vendor/tiptap/editor/components/editor-toolbar/RTFEditorToolbar";
import { IonItem, IonItemDivider, IonList } from "@ionic/react";
import { useEffect } from "react";

export function RTFEditor({
  initialContent,
  onUpdate,
  canEdit = true,
  content,
}: {
  initialContent?: string;
  onUpdate?: (editor: Editor) => void;
  canEdit: boolean;
  content?: string;
}) {
  const editor = useEditor({
    editable: canEdit,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: initialContent || content,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor);
      }
    },
  });

  useEffect(() => {
    if (editor && content !== undefined) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <IonList lines="none">
        {canEdit && (
          <IonItemDivider sticky>
            <Toolbar>
              <RTFEditorToolbar />
            </Toolbar>
          </IonItemDivider>
        )}
        <IonItem>
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content"
          />
        </IonItem>
      </IonList>
    </EditorContext.Provider>
  );
}
