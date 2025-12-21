import { useEffect, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

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

// --- UI Primitives ---

// --- Tiptap Node ---
import { ImageUploadNode } from "@tiptap-ui/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@tiptap-ui/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@tiptap-ui/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@tiptap-ui/components/tiptap-node/code-block-node/code-block-node.scss";
import "@tiptap-ui/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@tiptap-ui/components/tiptap-node/list-node/list-node.scss";
import "@tiptap-ui/components/tiptap-node/image-node/image-node.scss";
import "@tiptap-ui/components/tiptap-node/heading-node/heading-node.scss";
import "@tiptap-ui/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---

// --- Icons ---

// --- Hooks ---
import { useIsBreakpoint } from "@tiptap-ui/hooks/use-is-breakpoint";

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@tiptap-ui/lib/tiptap-utils";

// --- Styles ---
import "@tiptap-ui/components/tiptap-templates/editor/RTFEditor.scss";

export function RTFViewer({
  content,
  onUpdate,
}: {
  content?: string;
  onUpdate?: (editor: any) => void;
}) {
  const isMobile = useIsBreakpoint();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  );

  const editor = useEditor({
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
    content: content,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor);
      }
    },
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
