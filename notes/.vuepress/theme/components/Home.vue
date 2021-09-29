<template>
  <main class="home three-background" aria-labelledby="main-title">
    <!-- <canvas
      id="image-canvas"
      ref="imagecanvas"
      v-bind:width="width"
      v-bind:height="height"
    >
    </canvas> -->
    <header id="canvas-bg" class="hero">
      <div>
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
        />
      </div>

      <h1 v-if="data.heroText !== null" id="main-title">
        {{ data.heroText || $title || "Hello" }}
      </h1>

      <p v-if="data.tagline !== null" class="description">
        {{ data.tagline || $description || "Welcome to your VuePress site" }}
      </p>

      <p v-if="data.actionText && data.actionLink" class="action">
        <NavLink class="action-button" :item="actionLink" />
        <NavLink class="action-button" :item="actionLink2" />
      </p>
    </header>

    <div v-if="data.features && data.features.length" class="features">
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div v-if="data.footer" class="footer">
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
// import * as Three from "three";
// import * as POSTPROCESSING from "postprocessing";

export default {
  name: "Home",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      composer: null,
      mesh: null,
      height: 600,
      width: "100%",
      cloudParticles: [],
    };
  },
  components: { NavLink },

  mounted() {
    // this.cloudParticles = [];
    // this.init();
    // this.animate();
    // window.addEventListener("resize", this.handleResize);
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      };
    },
    actionLink2() {
      return {
        link: this.data.actionLink2,
        text: this.data.actionText2,
      };
    },
    // canvas: function () {
    //   return this.$refs.imagecanvas;
    // },
  },
  methods: {
    // handleResize: function () {
    //   const parentDom = document.getElementById("canvas-bg");
    //   this.height = parentDom.clientHeight;
    //   this.width = parentDom.clientWidth;
    //   this.camera.aspect = window.innerWidth / this.height;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize(window.innerWidth, this.height + 100);
    // },
    // init: function () {
    //   this.scene = new Three.Scene();
    //   this.camera = new Three.PerspectiveCamera(
    //     100,
    //     window.innerWidth / this.height,
    //     1,
    //     1000
    //   );
    //   this.camera.position.z = 1;
    //   // this.camera.position.x = 70;
    //   // this.camera.position.y = 0;
    //   this.camera.rotation.x = 1.16;
    //   this.camera.rotation.y = -0.2;
    //   this.camera.rotation.z = 0.27;
    //   let ambient = new Three.AmbientLight(0x6a92b1);
    //   this.scene.add(ambient);
    //   let directionalLight = new Three.DirectionalLight(0x81939f);
    //   directionalLight.position.set(500, 20, 100);
    //   this.scene.add(directionalLight);
    //   // let orangeLight = new Three.PointLight(0x818e79, 50, 450, 1.7);
    //   // orangeLight.position.set(200, 300, 100);
    //   // this.scene.add(orangeLight);
    //   // let redLight = new Three.PointLight(0x7f8161, 50, 450, 1.7);
    //   // redLight.position.set(100, 300, 100);
    //   // this.scene.add(redLight);
    //   // // let blueLight = new Three.PointLight(0x4e6c77, 50, 450, 1.7);
    //   // blueLight.position.set(200, 300, 100);
    //   // this.scene.add(blueLight);
    //   const texture = new Three.TextureLoader().load("/smoke2.png");
    //   if (texture) {
    //     let cloudGeo = new Three.PlaneBufferGeometry(200, 200);
    //     let cloudMaterial = new Three.MeshLambertMaterial({
    //       map: texture,
    //       transparent: true,
    //     });
    //     this.cloudParticles = [];
    //     for (let p = 0; p < 50; p++) {
    //       let cloud = new Three.Mesh(cloudGeo, cloudMaterial);
    //       cloud.position.set(Math.random() * 210, 170, Math.random() * -160);
    //       cloud.rotation.x = 1.16;
    //       cloud.rotation.y = 0.12;
    //       cloud.rotation.z = Math.random() * 0.12 * Math.PI;
    //       cloud.material.opacity = 0.9;
    //       this.cloudParticles.push(cloud);
    //       this.scene.add(cloud);
    //     }
    //   }
    //   // const textureEffect = new POSTPROCESSING.TextureEffect({
    //   //   blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
    //   //   texture: texture,
    //   // });
    //   // textureEffect.blendMode.opacity.value = 0.1;
    //   // const bloomEffect = new POSTPROCESSING.BloomEffect({
    //   //   blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
    //   //   kernelSize: POSTPROCESSING.KernelSize.SMALL,
    //   //   useLuminanceFilter: true,
    //   //   luminanceThreshold: 0.3,
    //   //   luminanceSmoothing: 0.75,
    //   // });
    //   // bloomEffect.blendMode.opacity.value = 1.5;
    //   // let effectPass = new POSTPROCESSING.EffectPass(
    //   //   this.camera,
    //   //   bloomEffect,
    //   //   textureEffect
    //   // );
    //   // effectPass.renderToScreen = true;
    //   this.renderer = new Three.WebGLRenderer({
    //     powerPreference: "high-performance",
    //     antialias: false,
    //     stencil: false,
    //     depth: false,
    //     alpha: true,
    //     canvas: this.$refs.imagecanvas,
    //   });
    //   this.renderer.setSize(window.innerWidth, this.height + 100);
    //   // this.scene.fog = new Three.FogExp2(0xfffff, 0.001);
    //   // this.renderer.setClearColor(this.scene.fog.color);
    //   // this.handleResize();
    //   // this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
    //   // this.composer.addPass(
    //   //   new POSTPROCESSING.RenderPass(this.scene, this.camera)
    //   // );
    //   // this.composer.addPass(effectPass);
    // },
    // animate: function () {
    //   this.renderer.render(this.scene, this.camera);
    //   this.cloudParticles.forEach((p) => {
    //     p.rotation.z -= 0.0008;
    //   });
    //   // this.composer.render(0.3);
    //   requestAnimationFrame(this.animate);
    // },
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="stylus">
// .three-background {
// // width: 100%;
// position: relative;
// display: block;
// }

// .three-background canvas {
// position: absolute;
// right: 0;
// top: 0;
// bottom: 0;
// /* margin: 0 auto; */
// z-index: 2;
// left: 0;
// z-index: 5;
// width: 100% !important;
// }
.home {
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;
    z-index: 10;
    position: relative;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
      position: relative;
      z-index: 10;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>