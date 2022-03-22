import React from 'react'

import TasksCompletion from "./TasksCompletion"
import TasksByCategory from './TasksByCategory'

export default function Dashboard() {
    return (
        <div>
            <TasksCompletion />
            <TasksByCategory />
        </div>
    )
}
