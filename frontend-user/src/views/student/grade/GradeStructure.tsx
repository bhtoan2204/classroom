import { useEffect, useState } from 'react';
import { GET_getGradeStructure } from 'src/api/student/grade/grade_structure/api';

const MockData: any =
    [
        {
            key: '1',
            nameOfGrade: "Quiz 1",
            gradeScale: "1",
            isFinalized: false,
        },
        {
            key: '2',
            nameOfGrade: "Quiz 2",
            gradeScale: "1",
            isFinalized: false,
        },
        {
            key: '3',
            nameOfGrade: "Project 1",
            gradeScale: "1.5",
            isFinalized: false,
        },
        {
            key: '4',
            nameOfGrade: "Project 2",
            gradeScale: "1.5",
            isFinalized: false,
        },
        {
            key: '5',
            nameOfGrade: "Midterm",
            gradeScale: "2",
            isFinalized: false,
        },
        {
            key: '6',
            nameOfGrade: "Final",
            gradeScale: "3",
            isFinalized: false,
        },
    ]

function GradeStructure({ ClassId }: any) {
    const [dataSource, setDataSource] = useState<any>(MockData);
    const [needToRefetchData, setNeedToRefetchData] = useState<any>(false);

    useEffect(() => {
        async function fetchGradeStructure() {
            const { status, data } = await GET_getGradeStructure(ClassId)
            if (status == 200) {
                setDataSource(data)
                setNeedToRefetchData(false);
            }
            else {
                setDataSource([])
            }
        }

        fetchGradeStructure()

    }, [needToRefetchData, ClassId, dataSource])

    return (
        <>
            <div className="w-full h-full px-40">
                <div key={"grade-struture-table"} className='w-full h-full mt-4'>

                </div>
            </div>
        </>
    )
}

export default GradeStructure