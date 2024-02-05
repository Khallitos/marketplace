import * as yup from "yup";

export const receivingVesselSchema2 = yup.object().shape({
     
          receivingTerminalGOV: yup.string().required(),
          receivingTerminal: yup.string().required(),
          receivingTerminalDensity: yup.number().required(),
          receivingTerminalWCF: yup.number().required(),
          receivingTerminalTemperature: yup.number().required(),
          receivingTerminalVCF: yup.number().required(),
          receivingTerminalGSV: yup.number().required(),
          receivingTerminalMTVAC: yup.number().required(),
          receivingTerminalMTAIR: yup.number().required(),
          receivingTerminalGSV20: yup.number().required(),
          receivingTerminalMTVAC20: yup.number().required(),
          receivingTerminalMTAIR20: yup.number().required(),
          mogsFlowmeterReading: yup.number().required(),
          mogsTerminalDensity20: yup.number().required(),
          mogsTerminalVCF: yup.number().required(),
          mogsTerminalGSV20: yup.number().required(),
          mogsTerminalMTVAC20: yup.number().required(),
          mogsTerminalMTAIR20: yup.number().required(),
        })
