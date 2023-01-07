import React from 'react';
import ReactQuill from 'react-quill';
import {DeltaStatic, Sources} from 'quill'
import 'react-quill/dist/quill.snow.css';

type RichTextFieldProps  = {
  value: string;
  setValue?(value: string, delta: DeltaStatic, source: Sources, editor:  ReactQuill.UnprivilegedEditor): void;
}

function RichTextField({value, setValue} : RichTextFieldProps) {
  let error = (value.length >1 && value.length < 100)
  return (
    <div style={{border: error ? '1px solid red' : undefined}}>
      <ReactQuill theme="snow" value={value} onChange={setValue} style={{fontColor: 'black'}} />
    </div>
  )
}
export default RichTextField;