import { WebUUID } from "web-uuid";

const supportLists = ref();
const qaLists = ref();
const spacesLists = ref();
const spacesMembers = ref();

export default () => {
  // Support
  const createSupport = async (support: any) => {
    const id = new WebUUID();

    const supportData = {
      pub: support.user,
      name: support.name,
      about: support.about,
      default: support.default,
      id,
    };
    try {
      await $fetch(baseApiURL() + "manage/create-new-support", {
        method: "POST",
        body: supportData,
      });
      getSupportLists();
    } catch (error) {
      console.log(error);
    }
  };
  const getSupportLists = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "manage/support-lists", {
        method: "GET",
      });
      const response: string[] = await JSON.parse(api);
      supportLists.value = response;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSupportItem = async (supportId: string) => {
    try {
      await $fetch(baseApiURL() + "manage/delete-support-item", {
        method: "DELETE",
        params: {
          supportId,
        },
      });
      getSupportLists();
    } catch (error) {
      console.log(error);
    }
  };
  // Space
  const createSpace = async (support: any) => {
    const spaceId = new WebUUID();

    try {
      await $fetch(baseApiURL() + "manage/create-new-space", {
        method: "POST",
        body: {
          ...support,
          spaceId,
        },
      });
      getSpacesLists();
    } catch (error) {
      console.log(error);
    }
  };
  const getSpacesLists = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "manage/spaces-lists", {
        method: "GET",
      });
      const response: string[] = await JSON.parse(api);
      spacesLists.value = response;
    } catch (error) {
      console.log(error);
    }
  };
  const addMemberToSpace = async (memberDetail: any) => {
    console.log(memberDetail);
    try {
      await $fetch(baseApiURL() + "manage/add-member-to-space", {
        method: "POST",
        body: memberDetail,
      });
      getSpacesMembers(memberDetail.spaceId);
    } catch (error) {
      console.log(error);
    }
  };
  const getSpacesMembers = async (spaceId: string) => {
    try {
      const api: any = await $fetch(baseApiURL() + "manage/spaces-members", {
        method: "GET",
        params: {
          spaceId,
        },
      });
      const response: string[] = await JSON.parse(api);
      spacesMembers.value = response;
    } catch (error) {
      console.log(error);
    }
  };
  // QA
  const createQa = async (qa: any) => {
    const id = new WebUUID();

    try {
      await $fetch(baseApiURL() + "manage/create-new-qa", {
        method: "POST",
        body: {
          ...qa,
          id,
        },
      });
      getQaLists();
    } catch (error) {
      console.log(error);
    }
  };
  const getQaLists = async () => {
    try {
      const api: any = await $fetch(baseApiURL() + "manage/qa-lists", {
        method: "GET",
      });
      const response: string[] = await JSON.parse(api);
      qaLists.value = response;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createSupport,
    supportLists,
    getSupportLists,
    createQa,
    getQaLists,
    qaLists,
    getSpacesLists,
    createSpace,
    spacesLists,
    getSpacesMembers,
    addMemberToSpace,
    spacesMembers,
    deleteSupportItem,
  };
};
