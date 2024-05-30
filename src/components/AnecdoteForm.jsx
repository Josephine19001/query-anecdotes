import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { getId } from '../utils';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  // const newAnecdoteMutation = useMutation(createAnecdote, {
  //   onSuccess: (newAnecdote) => {
  //     const anecdotes = queryClient.getQueryData(['anecdotes']);
  //     queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
  //   },
  //   onError: () => {}
  // });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // newAnecdoteMutation.mutate({ id: getId(), content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
