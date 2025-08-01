import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from './index.js'

import { addPoll } from "../features/pollSlice.js"
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../utils/axiosInstance.js'

const CreatePoll = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  console.log("USER STATUS", isLoggedIn);

  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm()
  const dispatch = useDispatch()
  const userSessionPolls = useSelector(state => state.poll.userPolls)
  const [createError, setCreateError] = useState("")


  const pollHandler = async (pollData) => {
    const { question, ...options } = pollData;

    const optionArray = Object.keys(options).map(key => ({
      text: options[key].trim(),
      voteCount: 0,
    }))

    const pollPayload = {
      question,
      options: optionArray,
      timePosted: Date().toString(),
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toString()
    }
    console.log("Current Poll data: ", pollPayload)

    try {
      const res = await axiosInstance.post('/poll/post', pollPayload)

      const createdPoll = res?.data?.data;
      if (!createdPoll) {
        console.error("Poll creation failed: Poll can't be posted");
        setCreateError("Poll creation failed.");
        return;
      }

      dispatch(addPoll(createdPoll));
      reset();
      setOptionCount(0);
      setCreateError("");

    } catch (error) {
      setCreateError(error.response?.data?.message || error.message)
    }
  }

  const [optionCount, setOptionCount] = useState(0)
  const addOption = () => {
    if (optionCount < 3) setOptionCount(prev => prev + 1);
  }

  useEffect(() => {
    console.log("User Session Polls in REDUX: ", userSessionPolls);
  }, [userSessionPolls, isLoggedIn])

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 flex items-center justify-center py-10 px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl max-w-2xl w-full p-8 text-white">

        <h2 className="text-3xl font-bold mb-2 text-center">Create a New Poll</h2>
        <p className="text-gray-200 text-center mb-8">Ask anything, get instant feedback.</p>

        {createError && (
          <p className="text-red-500 text-center font-medium mb-4">{createError}</p>
        )}

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

            {/* Mandatory Option 1 */}
            <div>
              <Input
                label="Option 1"
                placeholder="Enter option 1"
                {...register("option1", {
                  required: "Option 1 is required"
                })}
              />
              {errors.option1 && <p className='text-red-400 text-sm mt-1'>{errors.option1.message}</p>}
            </div>

            {/* Mandatory Option 2 */}
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

            {/* Additional Options */}
            {Array.from({ length: optionCount }).map((_, idx) => {
              const count = idx + 3;
              const fieldName = `option${count}`;
              return (
                <div key={fieldName} className="flex items-start gap-2 mb-4">
                  <div className="flex-1">
                    <Input
                      label={`Option ${count}`}
                      placeholder={`Enter option ${count}`}
                      {...register(fieldName, {
                        required: `Option ${count} is required`
                      })}
                    />
                    {errors[fieldName] && (
                      <p className="text-red-400 text-sm mt-1">{errors[fieldName].message}</p>
                    )}
                  </div>
                  <Button
                    id={fieldName}
                    type="button"
                    className="mt-[30px] px-3 py-2"
                  >
                    ❌
                  </Button>
                </div>
              );
            })}


            {/* Add Option Button */}
            {optionCount < 3 &&
              <Button
                onClick={addOption}
                className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-xl shadow-md'
              >
                Add Option
              </Button>
            }
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-4 ">
            <Button
              type='submit'
              disabled={!isLoggedIn}
              className={`w-full text-white font-semibold py-2 rounded-xl shadow-md transition ${!isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'}`}
            >
              Submit Poll
            </Button>
            <Button
              onClick={() => {
                reset(undefined);
                clearErrors();
                setOptionCount(0);
              }}
              className='w-[40%] bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md'
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
