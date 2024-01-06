import { Table } from 'antd';

import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import DndGradeStructureRow from './components/DndGradeStructureRow';


// const MockData: any = 
// [
//     {
//         key: '1',
//         nameOfGrade: "Quiz 1",
//         gradeScale: "1",
//         isFinalized: false,
//     },
//     {
//         key: '2',
//         nameOfGrade: "Quiz 2",
//         gradeScale: "1",
//         isFinalized: false,
//     },
//     {
//         key: '3',
//         nameOfGrade: "Project 1",
//         gradeScale: "1.5",
//         isFinalized: false,
//     },
//     {
//         key: '4',
//         nameOfGrade: "Project 2",
//         gradeScale: "1.5",
//         isFinalized: false,
//     },
//     {
//         key: '5',
//         nameOfGrade: "Midterm",
//         gradeScale: "2",
//         isFinalized: false,
//     },
//     {
//         key: '6',
//         nameOfGrade: "Final",
//         gradeScale: "3",
//         isFinalized: false,
//     },
// ]

function GradeStructure({DataSource, setDataSourceCallback}: any) {
    const [dataSource, setDataSource] = useState<any>(DataSource)

    const columns: any =
        [
            {
                title: "",
                dataIndex: "key",
                key: "sort",
                width: 80,
            },
            {
                title: "Grade composition",
                dataIndex: "nameOfGrade",
                key: "nameOfGrade",
                width: 550,
            },
            {
                title: "Grade scale",
                dataIndex: "gradeScale",
                key: "scale",
                width: 120,

            },

            //   render: (_, record) =>
            //   {
            //     //record schema
            //     //     {
            //     //       "gradeCompo_name": "Quiz 1",
            //     //       "gradeCompo_scale": 10,
            //     //       "is_finalized": false,
            //     //       "_id": "6582c26a7b9c22f52ff54750",
            //     //       "id": "6582c26a7b9c22f52ff54750"
            //     //     }
            //     return(
            //       <>
            //         <Popconfirm
            //           open={record.isDeleting}
            //           title={"Warning"}
            //           description={"Do you want to delete this composition? This action can be undo!"}
            //           onCancel={(e) => {handleRemoveGradeCompositionCancel(record)}}
            //           onConfirm={(e) => {handleRemoveGradeCompositionConfirm(record)}}
            //           >
            //             <button className="hover:bg-blue-600 hover:text-white"><DeleteOutlined style={{fontSize: 'larger'}}
            //             onClick={(e) => {handleRemoveGradeCompositionClick(record)}}
            //             /></button>
            //         </Popconfirm>
            //       </>
            //     )
            //   }
        ]


    function onDragEnd({ active, over }: any) {
        if (active.id !== over?.id) {
            setDataSource((previous: any) => {
                const activeIndex = previous.findIndex((i: any) => i.key === active.id);
                const overIndex = previous.findIndex((i: any) => i.key === over?.id);

                return arrayMove(previous, activeIndex, overIndex);
            });
        }
    };

    return (
        <>
            <div className="w-full h-full px-40">
                <div key={"grade-struture-table"} className='w-full h-full mt-4'>
                    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                        <SortableContext

                            // rowKey array

                            items={dataSource.map((value: any) => value.key)}
                            strategy={verticalListSortingStrategy}
                        >
                            <Table
                                components={{
                                    body: {
                                        row: DndGradeStructureRow,
                                    },
                                }}
                                rowKey="key"
                                columns={columns}
                                dataSource={dataSource}
                                scroll={{ y: 400 }}
                            />
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </>
    )
}

export default GradeStructure