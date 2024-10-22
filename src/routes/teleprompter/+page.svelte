<script land="ts">
  import Teleprompter from "../../features/teleprompter/Teleprompter.svelte";
  import { teleprometerData } from '../../features/teleprompter/store/store';

  export let data;

  teleprometerData.set(data.teleprompters);

  </script>
  
  <h1>Teleprompter</h1>
  <Teleprompter />