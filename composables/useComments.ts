const pendingComments = ref<string[]>([]);

export default () => {
  const sendComment = async (comment: string, path: string) => {
    const body = {
      comment,
      path,
    };
    try {
      await useFunctions(baseApiURL() + "comments/send-comment", {
        method: "POST",
        body,
      });
    } catch (error) {}
  };

  const getPendingComments = async (range?: number): string[] => {
    try {
      const api: string = await useFunctions(
        baseApiURL() + "comments/get-pending-comments",
        {
          method: "GET",
          params: {
            range: range ?? 12,
          },
        }
      );
      pendingComments.value = await JSON.parse(api);
    } catch (error) {
      return [];
    }
  };
  const getCommentData = async (commentKey: string) => {
    if (typeof window === undefined) return;

    try {
      const api: string = await useFunctions(
        baseApiURL() + "comments/get-comment-data",
        {
          method: "GET",
          params: {
            commentKey,
          },
        }
      );

      return await JSON.parse(api);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    sendComment,
    getPendingComments,
    getCommentData,
    pendingComments,
  };
};
