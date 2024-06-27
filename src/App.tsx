import { useState } from "react"
import ExpenseList from "./expense-tracker/components/ExpenseList"
import Form from "./expense-tracker/components/ExpenseForm"
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
import { FormData } from "./expense-tracker/components/ExpenseForm"

function App() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "aaa", amount: 20, category: "Groceries" },
    { id: 3, description: "aaa", amount: 30, category: "Utilities" },
    { id: 4, description: "aaa", amount: 40, category: "Groceries" },
    { id: 5, description: "aaa", amount: 50, category: "Entertainment" },
  ])

  const handleDeleteFromList = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses

  const onExpenseAdd = (expense: FormData) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
  }

  return (
    <>
      <Form onFormSubmit={onExpenseAdd}></Form>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={handleDeleteFromList}
      ></ExpenseList>
    </>
  )
}

export default App
