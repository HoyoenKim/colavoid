<template>
  <q-page>
    <div class="q-pa-md row" style="border: 1px solid rgba(86, 61, 124, 0.2)">
      <div class="col-2"><q-chip>control panel</q-chip></div>
      <div class="col-2">
        <q-btn
          @click="
            doAlert = !doAlert;
            alertFlag = false;
          "
          >Stop/Start</q-btn
        >
      </div>
      <div class="col-2 q-pr-md">
        <q-input dense outlined v-model="angle"> angle </q-input>
      </div>
      <div class="col-2 q-pl-md">
        <q-input dense outlined v-model="value"> range </q-input>
      </div>
    </div>
    <div class="col">
      <div class="row q-pa-md flex-center text-h5">
        Collision Avoidance Notification
      </div>
      <div :class="alertState">
        <div style="border: 1px solid rgba(86, 61, 124, 0.2)">
          <q-overlay background-color="#FFFFFF" v-model="model">
            <template v-slot:body>
              <div style="height: 100px"></div>
              <div class="row">
                <div style="width: 100px"></div>
                <div>
                  <q-circular-progress
                    reverse
                    :angle="angle"
                    :value="value"
                    size="300px"
                    :thickness="0.6"
                    color="red-5"
                    track-color="grey-5"
                    center-color="grey-7"
                    class="q-ma-md"
                  />
                </div>
              </div>
            </template>
            <q-circular-progress
              reverse
              :angle="angle"
              :value="value"
              size="500px"
              :thickness="0.8"
              color="blue-6"
              track-color="grey-4"
              center-color="grey-9"
              class="q-ma-md"
            />
          </q-overlay>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted, computed } from "vue";

export default defineComponent({
  name: "alarm",
  setup() {
    let timer;
    var alertFlag = ref(false);
    var doAlert = ref(false);
    onMounted(() => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (doAlert.value) {
          alertFlag.value = !alertFlag.value;
        } else {
          alertFlag.value = false;
        }
      }, 300);
      window.api.receive("s", (data) => {
        if (data.slice(-1) == "1") {
          doAlert.value = false;
          alertFlag.value = false;
          console.log("no siren");
        } else {
          doAlert.value = true;
          alertFlag.value = true;
          console.log("siren");
        }
      });
    });
    return {
      value: ref(30),
      model: ref(true),
      angle: ref(50),
      alertState: computed(() => {
        if (alertFlag.value) {
          return "row flex-center bg-red";
        } else {
          return "row flex-center";
        }
      }),
      doAlert: doAlert,
    };
  },
});
</script>
