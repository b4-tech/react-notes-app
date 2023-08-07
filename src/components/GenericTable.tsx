import { HeaderConfig } from "../models/models";

interface GenericTableProps {
	headers: HeaderConfig[];
	children: React.ReactNode;
	rowClassName?: string;
}

const GenericTable: React.FC<GenericTableProps> = ({ headers, children, rowClassName }) => (
	<table>
		<thead>
			<tr className={rowClassName || ""}>
				{headers.map((header, index) => (
					<th
						key={index}
						onClick={header.onClick}
						className={header.isActive ? 'active-tab' : ''}>
						{header.label || header.content}
					</th>
				))}
			</tr>
		</thead>
		<tbody>
			{children}
		</tbody>
	</table>
);

export default GenericTable