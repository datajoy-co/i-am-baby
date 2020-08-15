function Cell (props) {
  if (props.index === 0) {
    return (
      <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900'>
        {props.children}
      </td>
    )
  }

  if (props.last) {
    return (
      <td className='px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium'>
        {props.children}
      </td>
    )
  }

  return (
    <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500'>
      {props.children}
    </td>
  )
}

function Row (props) {
  const even = props.index % 2 === 0
  const trColor = even ? 'bg-white' : 'bg-gray-50'
  const cells = props.cells.map((cell, index) => (
    <Cell key={index} last={index === props.cells.length - 1}>
      {cell}
    </Cell>
  ))

  return <tr className={trColor}>{cells}</tr>
}

function TableHeading (props) {
  return (
    <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
      {props.children}
    </th>
  )
}

export default function NameTable (props) {
  const headings = props.columns.map(column => (
    <TableHeading key={column}>{column}</TableHeading>
  ))
  const rows = props.rows.map((row, index) => (
    <Row key={row[0]} index={index} cells={row} />
  ))

  return (
    <div className='flex flex-col'>
      <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex justify-center'>
        <div className='align-middle inline-block min-w-0 shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
          <table className='min-w-full'>
            <thead>
              <tr>{headings}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
