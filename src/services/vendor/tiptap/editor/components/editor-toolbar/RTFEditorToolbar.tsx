import { Spacer } from "@tiptap-ui/components/tiptap-ui-primitive/spacer";
import { ToolbarGroup, ToolbarSeparator } from "@tiptap-ui/components/tiptap-ui-primitive/toolbar";
import { BlockquoteButton } from "@tiptap-ui/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@tiptap-ui/components/tiptap-ui/code-block-button";
import { ColorHighlightPopover } from "@tiptap-ui/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@tiptap-ui/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@tiptap-ui/components/tiptap-ui/image-upload-button";
import { LinkPopover } from "@tiptap-ui/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@tiptap-ui/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@tiptap-ui/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@tiptap-ui/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@tiptap-ui/components/tiptap-ui/undo-redo-button";

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
