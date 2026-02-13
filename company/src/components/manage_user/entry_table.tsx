import React  from "react";
import Action from "./action";


type RowData = {
  [key: string]: string | number;
};

const data: RowData[] = Array.from({ length: 10 }).map((_, i) => ({
  col1: `R${i + 1}C1`,
  col2: `R${i + 1}C2`,
  col3: `R${i + 1}C3`,
  col4: `R${i + 1}C4`,
  col5: `R${i + 1}C5`,
  col6: `R${i + 1}C6`,
  col7: `R${i + 1}C7`,
  col8: `R${i + 1}C8`,
}));

const EntryTable:React.FC=()=> {
    const handeltoggol=(idx:number)=>{
      console.log("toggol row",idx)
    }
    const handelEdit=(idx:number)=>{
      console.log("edit row",idx);
      
    }
  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Column 1</th>
            <th className="px-4 py-2 border">Column 2</th>
            <th className="px-4 py-2 border">Column 3</th>
            <th className="px-4 py-2 border">Column 4</th>
            <th className="px-4 py-2 border">Column 5</th>
            <th className="px-4 py-2 border">Column 6</th>
            <th className="px-4 py-2 border">Column 7</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-2 border text-center">{row.col1}</td>
              <td className="px-4 py-2 border text-center">{row.col2}</td>
              <td className="px-4 py-2 border text-center">{row.col3}</td>
              <td className="px-4 py-2 border text-center">{row.col4}</td>
              <td className="px-4 py-2 border text-center">{row.col5}</td>
              <td className="px-4 py-2 border text-center">{row.col6}</td>
              <td className="px-4 py-2 border text-center">{row.col7}</td>
              <td className="px-4 py-2 border text-center">
                <Action
                isActive={true}
                onToggle={()=>handeltoggol(idx)}
                onEdit={()=>handelEdit(idx)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default EntryTable;
