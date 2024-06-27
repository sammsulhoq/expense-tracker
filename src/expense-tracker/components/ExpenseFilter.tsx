import categories from "../categories"

interface Props {
  onSelectCategory: (category: string) => void
}

function ExpenseFilter({ onSelectCategory }: Props) {
  return (
    <select
      className="form-select"
      onChange={(evt) => onSelectCategory(evt.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}

export default ExpenseFilter
