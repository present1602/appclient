import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities";
import { CloseButton } from 'components/ui';


export function SortableItem({ removeFile, id, filename, full_path, index }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: '2px solid black',
    marginBottom: 5,
    marginTop: 5,
    opacity: isDragging ? 0.5 : 1,
  }


  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}
    >
      <div className='upload-file w-full h-[120px] py-1 px-1' >
        <div className='flex w-full h-full'>
          <div className='h-full flex justify-center w-[180px]'>
            <img src={full_path} className='h-full' />
          </div>
          <div className="upload-file-info">
            <h6 className="upload-file-name">{filename}</h6>
          </div>
        </div>

        <div className="cursor-pointer z-50 border-red-100"
          onClick={
            (e) => {
              removeFile(index)
            }
          }
        >
          <CloseButton
            className="upload-file-remove"
          />
        </div>

      </div>
    </div>
  )
}