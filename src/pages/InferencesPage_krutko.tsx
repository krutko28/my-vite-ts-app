import { useQuery } from '@tanstack/react-query'
import { getInferences } from '../api/inferences'

export function InferencesPage_Krutko() {
  const {
    data,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['inferences-krutko'],
    queryFn: getInferences,
  })

  const loading = isFetching || isLoading

  return (
    <div>
      <h1>Inferences list</h1>

      <button
        type="button"
        className="counter"
        onClick={() => void refetch()}
        disabled={loading}
      >
        Update inferences list
      </button>

      {loading && <p>Inferences list loading...</p>}

      {isError && (
        <p>Не удалось загрузить список. Попробуйте обновить его.</p>
      )}

      {!loading && !isError && (
        <div>
          {data?.data.length === 0 && <p>Список пуст.</p>}

          {data?.data.map((inference) => (
            <article key={inference.id}>
              <h2>{inference.title}</h2>
              <p>{inference.content}</p>
              <p>Просмотры: {inference.hit}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}