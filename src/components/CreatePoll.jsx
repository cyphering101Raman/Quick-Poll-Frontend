import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from './index.js'

import { addPoll } from "../features/pollSlice.js"
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../utils/axiosInstance.js'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';

const CreatePoll = () => {

  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const userSessionPolls = useSelector(state => state.poll.userPolls)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, reset, clearErrors, unregister, setValue, getValues } = useForm()

  const [createError, setCreateError] = useState("")
  const [extraOptions, setExtraOptions] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
  }, [userSessionPolls, isLoggedIn])


  // Option Logic
  const addOption = () => {
    if (extraOptions.length < 3) {
      const nextOptNumber = extraOptions.length + 3;
      setExtraOptions([...extraOptions, `option${nextOptNumber}`]);
    }
  };

  const removeOption = (index) => {
    const oldExtra = [...extraOptions];
    const removed = oldExtra.splice(index, 1);
    const currValues = getValues();

    for (let i = index; i < oldExtra.length; i++) {
      const currField = `option${i + 3}`;
      const nextField = `option${i + 4}`;
      setValue(currField, currValues[nextField]);
    }

    const lastField = `option${oldExtra.length + 3}`;
    unregister(lastField);

    const resequenced = oldExtra.map((_, i) => `option${i + 3}`);
    setExtraOptions(resequenced);
  };


  // Poll Logic
  const pollHandler = async (pollData) => {
    setHasSubmitted(true);
    const { question, expiryDays, ...options } = pollData;
    const optionArray = Object.keys(options).map(key => ({
      text: options[key].trim(),
      voteCount: 0,
    }))

    const days = parseInt(expiryDays) || 7;

    const pollPayload = {
      question,
      options: optionArray,
      timePosted: Date().toString(),
      expiredAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toString()
    }

    // console.log("CREATE-POLL payload ", pollPayload);

    try {
      const res = await axiosInstance.post('/poll/post', pollPayload)
      const createdPoll = res?.data?.data;
      if (!createdPoll) {
        setCreateError("Poll creation failed.");
        toast.error("Poll creation failed");
        return;
      }

      dispatch(addPoll(createdPoll));
      reset();
      setExtraOptions([]);
      setCreateError("");
      setHasSubmitted(false);
      toast.success("Poll created successfully! Redirecting to Explore…", {
        autoClose: 3000
      })

      setTimeout(() => {
        navigate('/explore')
      }, 3000);

    } catch (error) {
      setCreateError(error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-600 flex items-center justify-center py-10 px-4">
      <div className="bg-gradient-to-br from-cyan-500 via-violet-900 to-purple-900 backdrop-blur-lg rounded-2xl shadow-xl max-w-2xl w-full p-8 text-white">

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
            {hasSubmitted && errors.question && <p className='text-red-400 text-sm mt-1'>{errors.question.message}</p>}
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
              {hasSubmitted && errors.option1 && <p className='text-red-400 text-sm mt-1'>{errors.option1.message}</p>}
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
              {hasSubmitted && errors.option2 && <p className='text-red-400 text-sm mt-1'>{errors.option2.message}</p>}
            </div>

            {/* Additional Options */}
            {extraOptions.map((optionVariable, idx) => {
              const count = idx + 3;
              return (
                <div key={optionVariable} className="flex items-start gap-2 mb-4">
                  <div className="flex-1">
                    <Input
                      label={`Option ${count}`}
                      placeholder={`Enter option ${count}`}
                      {...register(optionVariable, {
                        required: `Option ${count} is required`
                      })}
                    />
                    {hasSubmitted && errors[optionVariable] && (
                      <p className="text-red-400 text-sm mt-1">{errors[optionVariable].message}</p>
                    )}
                  </div>
                  <div className="mt-7 border border-white/30 rounded-lg p-1 bg-white/40">
                    <Button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="p-1"
                    >
                      ❌
                    </Button>
                  </div>
                </div>
              );
            })}

            {/* Add Option Button */}
            {extraOptions.length < 3 &&
              <Button
                onClick={addOption}
                className='w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-xl shadow-md'
                type="button"
              >
                Add Option
              </Button>
            }
          </div>

          {/* Expiry Days Selector */}
          <div>
            <label htmlFor="expiryDays" className="block text-sm font-medium text-gray-200 mb-1">
              Poll Expiry (in days)
            </label>
            <select
              id="expiryDays"
              {...register("expiryDays")}
              defaultValue="7"
              className="w-full bg-white/10 text-white border border-white/30 rounded-md py-2 px-3 focus:outline-none"
            >
              {[1, 2, 3, 5, 7, 10, 14, 30].map((day) => (
                <option key={day} value={day} className="text-black">
                  {day} {day === 1 ? "day" : "days"}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-4 ">
            <Button
              type='submit'
              disabled={!isLoggedIn}
              onClick={() => setHasSubmitted(true)}
              className={`w-full text-white font-semibold py-2 rounded-xl shadow-md transition ${!isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'}`}
            >
              Submit Poll
            </Button>
            <Button
              onClick={() => {
                reset();
                clearErrors();
                setExtraOptions([]);
                setHasSubmitted(false);
              }}
              type="button"
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
