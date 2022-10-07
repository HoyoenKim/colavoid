<template>
  <q-page>
    <div class="col">
      <div class="q-pt-xl row flex-center">
        <div style="border: 1px solid rgba(86, 61, 124, 0.2)">
          <div class="text-center text-bold q-pt-sm">Collision Alert</div>
          <div :class="alertState">
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
    {{detect_result}}
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted, computed } from "vue";
import { api } from 'boot/axios';

export default defineComponent({
  name: "alarm",
  setup() {
    let timer;
    let timer_blink;
    var alertFlag = ref(false);
    var doAlert = ref(false);
    var detect_result = ref({});
    onMounted(() => {
      clearInterval(timer);
      timer = setInterval(() => {
        api.get('/api/backend')
        .then((response) => {
          console.log(response.data)
          detect_result.value = response.data
          if(response.data.detect_result.length == 0) {
            alertFlag.value = false;
          }
          else {
            alertFlag.value = true;
          }
        })
        .catch(() => {
          console.log('Error exists')
        })
      }, 1000);

      timer_blink = setInterval(() => {
        if (doAlert.value) {
          alertFlag.value = !alertFlag.value;
        } else {
          alertFlag.value = false;
        }
      }, 300);
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
          return "bg-red";
        } else {
          return "";
        }
      }),
      doAlert: doAlert,
      expanded: ref(false),
      detect_result
    };
  },
});
</script>
