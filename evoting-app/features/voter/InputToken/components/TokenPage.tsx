'use client'

import { useTokenPage } from '../hooks/useTokenPage'

export default function TokenPage() {

  const {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  } = useTokenPage()

  return (
    <div>

      <h1>
        Input Token
      </h1>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >

        <input
          {...register('token')}
          maxLength={6}
        />

        {errors.token && (
          <p>
            {errors.token.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? 'Loading...'
            : 'Verifikasi'}

        </button>

      </form>

    </div>
  )
}