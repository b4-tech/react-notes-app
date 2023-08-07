import NotesTable from '../components/NotesTable'
import NoteModalButton from '../components/NoteModalButton'
import SummaryTable from '../components/SummaryTable'

const Home = () => {
	return (
		<>
			<NotesTable />
			<NoteModalButton />
			<SummaryTable />
		</>
	)
}

export default Home