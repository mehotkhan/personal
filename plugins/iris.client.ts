import iris from "../iris";
iris.session.init();
console.log(iris.session.getKey());

export default defineNuxtPlugin(() => {
  return {
    provide: {
      irisPrivate: iris.private,
      irisLocal: iris.local(),
      irisPublic: iris.public,
      irisGlobal: iris.global(),
      irisSession: iris.session,
      irisGroup: iris.group,
      SEA: iris.SEA,
    },
  };
});
