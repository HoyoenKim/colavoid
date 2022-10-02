<template>
  <q-page>
    <div class="col">
      <div>

        <div style="border: 1px solid rgba(86, 61, 124, 0.2)">
          <q-overlay background-color="#FFFFFF" v-model="model">
            <template v-slot:body>
              <div style="height: 280px"></div>
              <div class="row">
                <div style="width: 10px"></div>
                <div class="bg-white q-pt-sm" style="border: 1px solid rgba(86, 61, 124, 0.2)">
                  <div class="text-center text-bold">Collision Alert</div>
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
            <GMapMap
              :center="center"
              :zoom="17"
              map-type-id="terrain"
              style="height: 500px">
              <GMapMarker
                key="1"
                :position="markers[0].position"
                :clickable="true"
                :draggable="true">
              </GMapMarker>
            </GMapMap>
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
        <div class="col-4 q-pl-md">
          <q-input dense outlined v-model.number="center.lat"
            label="5 decimals"
            mask="##.#####"> lat </q-input>
        </div>
        <div class="col-4 q-pl-md">
          <q-input dense outlined v-model.number="center.lng"> lng </q-input>
        </div>
        <div class="col-4 q-pl-md">
          <q-btn
            icon="refresh"
            flat
            @click="model = !model;">
          </q-btn>
        </div>
      </div>
    </q-expansion-item>
    <!--
      <GMapMap
        :center="center"
        :zoom="17"
        map-type-id="terrain"
        style="height: 500px">
        <GMapMarker
          key="1"
          :position="markers[0].position"
          :clickable="true"
          :draggable="true">
        </GMapMarker>
        <GMapCluster :zoomOnClick="true">
          <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"/>
        </GMapCluster>
      </GMapMap>
    -->
  </q-page>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "mapdata",
  setup() {
    const center = { lat: 35.22901, lng: 126.84751 };
    const markers = [
      {
        position: {
          lat: 35.22901,
          lng: 126.84751,
        },
      },
      {
        position: {
          lat: 51.198429,
          lng: 6.69529,
        },
      },
      {
        position: {
          lat: 51.165218,
          lng: 7.067116,
        },
      },
      {
        position: {
          lat: 51.09256,
          lng: 6.84074,
        },
      },
    ];
    return {
      center: ref(center),
      markers: ref(markers),
      model: ref(true),
      angle: ref(20),
      value: ref(10),
      expanded: ref(false)
    };
  }
});
</script>
