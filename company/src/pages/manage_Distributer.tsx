import AddEntrybutton from "../components/manage_user/add_entry_button"
import CascadingDropdown from "../components/manage_user/cascading_dropdown"
import EntryTable from "../components/manage_user/entry_table"

const Distributer:React.FC=()=>{
    return (
        <div className="bg-gray-200 border-gray-300 text-gray-800
              dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 w-vw">
            <div className="w-vw flex flex-col md:flex-row ">
                <CascadingDropdown/>
                <AddEntrybutton/>
            </div>
            <div className="w-vw">
                <EntryTable/>
            </div>

        </div>
    )
}
export default Distributer;