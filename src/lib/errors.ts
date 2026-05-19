export const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  if (err && typeof err === 'object') {
    const errObj = err as Record<string, unknown>
    const responseData = errObj.response as Record<string, unknown> | undefined
    return (
      (typeof errObj.message === 'string' ? errObj.message : null) ||
      (typeof responseData?.data === 'object' && responseData?.data !== null
        ? (responseData.data as Record<string, unknown>).message as string
        : null) ||
      JSON.stringify(err)
    )
  }
  return 'An unexpected error occurred.'
}