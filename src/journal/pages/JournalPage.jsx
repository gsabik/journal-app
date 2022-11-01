import { useSelector } from "react-redux";
import JournalLayout from "../layout/JournalLayout";
import NoteView from "../views/NoteView";
import NothingSelectedView from "../views/NothingSelectedView";
import FloatingButton from "../components/FloatingButton";

const JournalPage = () => {
	const { active } = useSelector(state => state.journal);

    return (
       <JournalLayout>
			{
				!!active
				?
				<NoteView/>
				:
				<NothingSelectedView/>
			}
            <FloatingButton/>
       </JournalLayout>
    );
}

export default JournalPage