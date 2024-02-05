import * as yup from "yup"

export const mogsVesselSchema = yup.object().shape({
    mogsFlowmeterReading:yup.number().required(),
    mogsTerminalDensity20:yup.number().required(),
    mogsTerminalVCF:yup.number().required(),
    mogsTerminalGSV20:yup.number().required(),
    mogsTerminalMTVAC20:yup.number().required(),
    mogsTerminalMTAIR20:yup.number().required(),
})