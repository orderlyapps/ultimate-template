import { Spacer } from "@services/vendor/tiptap/generated-source/components/tiptap-ui-primitive/spacer";
import { ToolbarGroup, ToolbarSeparator } from "@services/vendor/tiptap/generated-source/components/tiptap-ui-primitive/toolbar";
import { BlockquoteButton } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/code-block-button";
import { ColorHighlightPopover } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/image-upload-button";
import { LinkPopover } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@services/vendor/tiptap/generated-source/components/tiptap-ui/undo-redo-button";

export const RTFEditorToolbar = () => {
    return (
        <>
            <Spacer />

            <ToolbarGroup>
                <UndoRedoButton action="undo" />
                <UndoRedoButton action="redo" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={false} />
                <ListDropdownMenu
                    types={["bulletList", "orderedList", "taskList"]}
                    portal={false} />
                <BlockquoteButton />
                <CodeBlockButton />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <MarkButton type="bold" />
                <MarkButton type="italic" />
                <MarkButton type="strike" />
                <MarkButton type="code" />
                <MarkButton type="underline" />

                <ColorHighlightPopover />
                <LinkPopover />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <MarkButton type="superscript" />
                <MarkButton type="subscript" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <TextAlignButton align="left" />
                <TextAlignButton align="center" />
                <TextAlignButton align="right" />
                <TextAlignButton align="justify" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
                <ImageUploadButton text="Add" />
            </ToolbarGroup>

            <Spacer />
        </>
    );
};
