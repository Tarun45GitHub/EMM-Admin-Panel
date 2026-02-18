import EntryTable from "../components/manage_user/entry_table";

const AllTransaction:React.FC=()=>{
    return(
        <div className="min-h-screen w-full">
            <h2 className="text-center p-3  dark:text-gray-200 text-xl">Table 1</h2>
           <EntryTable/>
           <h2 className="text-center p-3 dark:text-gray-200 text-xl">Table 1</h2>
           <EntryTable/>
           <h2 className="text-center p-3 dark:text-gray-200 text-xl">Table 1</h2>
           <EntryTable/>
           <h2 className="text-center p-3 dark:text-gray-200 text-xl">Table 1</h2>
           <EntryTable/>
           <h2 className="text-center p-3 dark:text-gray-200 text-xl">Table 1</h2>
           <EntryTable/>
        </div>
    );
}
export default AllTransaction;