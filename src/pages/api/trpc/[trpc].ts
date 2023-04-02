/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc';
import { addMsg, deleteMsg, listMsgs } from '../crud';

const appRouter = router({
  addMsg: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .mutation(({ input }) => {
      addMsg(input?.text);
    }),
  deleteMsg: publicProcedure
    .input(
      z.object({
        timeStamp: z.number(),
      }),
    )
    .mutation(({ input }) => {
      deleteMsg(input.timeStamp);
    }),
  listMsgs: publicProcedure.query(() => {
    return listMsgs();
  }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
