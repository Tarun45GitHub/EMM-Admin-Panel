import AddEntrybutton from "../components/manage_user/add_entry_button"
import CascadingDropdown from "../components/manage_user/cascading_dropdown"
import EntryTable from "../components/manage_user/entry_table"

const Distributer:React.FC=()=>{
    return (
        <div className="bg-white border-gray-300 text-gray-800
  dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
">
            <div className="flex overflow-auto ">
            <div className="w-200 flex-auto">
                <CascadingDropdown/>
            </div>
            <div className="w-50 flex-auto  p-5">
                <AddEntrybutton/>
            </div>
            </div>
            <div>
                <EntryTable/>
            </div>

        </div>
    )
}
export default Distributer;