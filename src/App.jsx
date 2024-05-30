import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { NotificationProvider } from './NotificationContext';
import { useNotification } from './useNotification';

const App = () => {
  const queryClient = useQueryClient();
  const { notification, dispatch } = useNotification();

  // const updateVoteMutation = useMutation(updateAnecdote, {
  //   onSuccess: (updatedAnecdote) => {
  //     const anecdotes = queryClient.getQueryData(['anecdotes']);
  //     queryClient.setQueryData(
  //       ['anecdotes'],
  //       anecdotes.map((anecdote) =>
  //         anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
  //       )
  //     );
  //   }
  // });

  const handleVote = (anecdote) => {
    // updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });

    dispatch({
      type: 'showNotification',
      payload: `You voted for '${anecdote.content}'`
    });

    setTimeout(() => {
      dispatch({ type: 'hideNotification' });
    }, 5000);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong while fetching data</div>;
  }

  const anecdotes = data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      {notification && <Notification message={notification} />}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AppWithProvider = () => (
  <NotificationProvider>
    <App />
  </NotificationProvider>
);

export default AppWithProvider;
