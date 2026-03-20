'use client'

import React from 'react'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  toolbarPlugin,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertImage,
  InsertTable,
  ListsToggle,
  InsertThematicBreak,
  UndoRedo,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Comece a escrever seu conteúdo aqui...',
  disabled = false
}: RichTextEditorProps) {
  return (
    <div className="prose prose-blue max-w-none">
      <MDXEditor
        contentEditableClassName="min-h-[300px] p-4 bg-white/70 rounded-lg"
        placeholder={placeholder}
        markdown={content}
        onChange={onChange}
        readOnly={disabled}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin({
            imageUploadHandler: async (file) => {
              // TODO: Implementar upload de imagens
              return URL.createObjectURL(file)
            }
          }),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border-b">
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <ListsToggle />
                <InsertThematicBreak />
              </div>
            )
          })
        ]}
      />
    </div>
  )
}