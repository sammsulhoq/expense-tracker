import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import categories from "../categories"

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be atleast 3 characters." }),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(1, { message: "Amount cannot be zero." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
})

export type FormData = z.infer<typeof schema>

interface Props {
  onFormSubmit: (data: FormData) => void
}

function Form({ onFormSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onFormSubmit(data)
          reset()
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value=""></option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Form
