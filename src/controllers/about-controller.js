export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Where2Next",
      };
      return h.view("about-view", viewData);
    },
  },
};
