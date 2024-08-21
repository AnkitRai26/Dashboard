// export function Input(props) {
//     return <Input
//     type="text"
//     placeholder="Widget Text"
//     value={newWidget.text}
//     onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
//   />
//   }

export function Input(props) {
    return <input {...props} />;
  }
  
  