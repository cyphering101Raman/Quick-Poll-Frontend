import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from "./index.js"
import { getActiveUser } from '../utils/localStorage.js'
import { v4 as randomId } from 'uuid'
import { addPoll } from "../features/pollSlice.js"
import { useDispatch, useSelector } from 'react-redux'

const CreatePoll = () => {

  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const author = getActiveUser().fullName

  const allPoll = useSelector(state => state.poll.pollArray)

  const pollHandler = (pollData) => {
    pollData.id = randomId()
    pollData.author = author
    pollData.timePosted = Date().toString()

    dispatch(addPoll(pollData));
    console.log("Poll data: ", pollData)
    console.log("All Poll List: ", allPoll);

    reset();
  }

  const [optionCount, setOptionCount] = useState(0)
  const addOption = () => {
    if (optionCount < 3) setOptionCount(prev => prev + 1);
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 flex items-center justify-center py-10 px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl max-w-2xl w-full p-8 text-white">

        <h2 className="text-3xl font-bold mb-2 text-center">Create a New Poll</h2>
        <p className="text-gray-200 text-center mb-8">Ask anything, get instant feedback.</p>

        <form onSubmit={handleSubmit(pollHandler)} className="space-y-6">

          {/* Question Field */}
          <div>
            <Input
              label="Question"
              placeholder="Poll Question"
              {...register("question", {
                required: "Poll Question is required",
              })}
            />
            {errors.question && <p className='text-red-400 text-sm mt-1'>{errors.question.message}</p>}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-pink-300">Options</h3>

            <div>
              <Input
                label="Option 1"
                placeholder="Enter option 1"
                {...register("option1", {
                  required: "Option is required"
                })}
              />
              {errors.option1 && <p className='text-red-400 text-sm mt-1'>{errors.option1.message}</p>}
            </div>

            <div>
              <Input
                label="Option 2"
                placeholder="Enter option 2"
                {...register("option2", {
                  required: "Option 2 is required"
                })}
              />
              {errors.option2 && <p className='text-red-400 text-sm mt-1'>{errors.option2.message}</p>}
            </div>

            {Array.from({ length: optionCount }).map((_, idx) => {
              const count = idx + 3;
              const fieldName = `option${count}`;
              return (
                <div key={fieldName}>
                  <Input
                    label={`Option ${count}`}
                    placeholder={`Enter option ${count}`}
                    {...register(fieldName, {
                      required: `Option ${count} is required`
                    })}
                  />
                  {errors[fieldName] && <p className='text-red-400 text-sm mt-1'>{errors[fieldName].message}</p>}
                </div>
              )
            })}

            {/* Add Option Button */}
            {optionCount < 3 &&
              <Button
                type='button'
                onClick={addOption}
                className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-xl shadow-md'
              >
                Add Option
              </Button>
            }
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-6">
            <Button
              type='submit'
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-xl shadow-md"
            >
              Submit Poll
            </Button>
            <Button
              type='button'
              className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md'
            >
              Discard
            </Button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default CreatePoll
