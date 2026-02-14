import AddEntrybutton from "../components/manage_user/add_entry_button";
import CascadingDropdown from "../components/manage_user/cascading_dropdown";
import EntryTable from "../components/manage_user/entry_table";

const SuperDistributer:React.FC=()=>{
    return(
        <div>
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
export default SuperDistributer;