import { useSelector } from "react-redux";
import FloatingButton from "../components/FloatingButton";
import JournalLayout from "../layout/JournalLayout";
import NoteView from "../views/NoteView";
import NothingSelectedView from "../views/NothingSelectedView";

const JournalPage = () => {
	const { active } = useSelector(state => state.journal);

    return (
       <JournalLayout>
		{
			(!!active)
			?
			<NoteView/>
			:
			<NothingSelectedView/>
		}

            <FloatingButton/>
       </JournalLayout>
    )
}

export default JournalPage