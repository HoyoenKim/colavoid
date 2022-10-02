<template>
  <q-page>
    <div class="col">
      <div :class="alertState">
        <div style="border: 1px solid rgba(86, 61, 124, 0.2)">
          <div class="text-center text-bold">Collision Alert</div>
          <q-overlay background-color="#FFFFFF" v-model="model">
            <template v-slot:body>
              <div style="height: 50px"></div>
              <div class="row">
                <div style="width: 50px"></div>
                <div>
                  <q-circular-progress
                    reverse
                    :angle="angle"
                    :value="value"
                    size="150px"
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
              size="250px"
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
    <div class="q-pt-xl">
    </div>
    <q-expansion-item
      v-model="expanded"
      icon="perm_identity"
      label="control panel">
      <div class="q-pa-md row" style="border: 1px solid rgba(86, 61, 124, 0.2)">
        <div class="col-4 q-pr-md">
          <q-input dense outlined v-model="angle"> angle </q-input>
        </div>
        <div class="col-4 q-pl-md">
          <q-input dense outlined v-model="value"> range </q-input>
        </div>
        <div class="col-4 q-pl-md">
          <q-btn
            icon="refresh"
            flat
            @click="
              doAlert = !doAlert;
              alertFlag = false;
            "></q-btn>
        </div>
      </div>
    </q-expansion-item>
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
      //clearInterval(timer);
      //timer = setInterval(() => {
      //  if (doAlert.value) {
      //    alertFlag.value = !alertFlag.value;
      //  } else {
      //    alertFlag.value = false;
      //  }
      //}, 300);
      //window.api.receive("s", (data) => {
      //  if (data.slice(-1) == "1") {
      //    doAlert.value = false;
      //    alertFlag.value = false;
      //    console.log("no siren");
      //  } else {
      //    doAlert.value = true;
      //    alertFlag.value = true;
      //    console.log("siren");
      //  }
      //});
    });
    return {
      angle: ref(20),
      value: ref(10),
      model: ref(true),
      alertState: computed(() => {
        if (alertFlag.value) {
          return "q-pt-xl row flex-center bg-red";
        } else {
          return "q-pt-xl row flex-center";
        }
      }),
      doAlert: doAlert,
      expanded: ref(false)
    };
  },
});
</script>
