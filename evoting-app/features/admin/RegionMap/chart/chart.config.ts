import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
