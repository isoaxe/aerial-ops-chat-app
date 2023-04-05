/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc';
import { addMsg, deleteMsg, listMsgs } from '../crud';
import preSignedUrl from '../getPresignedUrl';

const appRouter = router({
  addMsg: publicProcedure
    .input(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal('WITHOUT_IMAGE'),
          text: z.string(),
        }),
        z.object({
          type: z.literal('WITH_IMAGE'),
          text: z.string(),
          imageUrl: z.string(),
        }),
      ]),
    )
    .mutation(({ input }) => {
      if (input.type === 'WITHOUT_IMAGE') addMsg(input.text);
      else addMsg(input.text, input.imageUrl);
    }),
  deleteMsg: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ input }) => {
      deleteMsg(input.id);
    }),
  listMsgs: publicProcedure
    .input(
      z.object({
        placeholder: z.number(),
      }),
    )
    .query(() => {
      return listMsgs();
    }),
  getPresignedUrl: publicProcedure
    .input(
      z.object({
        filename: z.string(),
        fileType: z.string(),
      }),
    )
    .query(({ input }) => {
      return preSignedUrl(input.filename, input.fileType);
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
