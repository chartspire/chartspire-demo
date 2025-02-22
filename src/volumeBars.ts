// ! to update to v10-Alpha3
import { IndicatorDefinition } from 'chartspire'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const volumeBars: IndicatorDefinition<any> = {
	isMainIndicator: true,
	isSubIndicator: false,
	parameters: [
		{
			paramNameKey: 'volumeBars',
			precision: 0
		}
	],
	name: 'volumeBars',
	shortName: 'Volume',
	calc: (kLineDataList) => {
		return kLineDataList.map(kLineData => kLineData.volume)
	},
	// @ts-expect-error ignore
	createTooltipDataSource: ({ kLineDataList, crosshair, indicator, defaultStyles }) => {
		const { dataIndex } = crosshair
		const result = indicator.result
		const styles = indicator.styles ?? defaultStyles
		let color
		const kLineData = kLineDataList[dataIndex!]
		if (kLineData.close > kLineData.open) {
			color = styles.bars![0].upColor
		} else if (kLineData.close < kLineData.open) {
			color = styles.bars![0].downColor
		} else {
			color = styles.bars![0].noChangeColor
		}
		return {
			name: 'Volume',
			values: [{ title: '', value: { text: result[dataIndex!] || 'n/a', color } }]
		}
	},
	// @ts-expect-error ignore
	draw: ({ ctx, kLineDataList, bounding, visibleRange, barSpace, defaultStyles, xAxis }) => {
		const { from, to } = visibleRange
		// @ts-expect-error ignore
		const result = kLineDataList.map(kLineData => kLineData.volume)
		// const result = indicator.result ! Does not work for some reason
		let maxVolume = Number.MIN_SAFE_INTEGER
		for (let i = from; i < to; i++) {
			const volume = result[i]
			maxVolume = Math.max(volume, maxVolume)
		}
		const height = bounding.height
		const maxBarHeight = height / 4
		ctx.globalCompositeOperation = 'destination-over'
		const styles = defaultStyles
		for (let i = from; i < to; i++) {
			const kLineData = kLineDataList[i]
			const volume = result[i]
			let color
			if (kLineData.close > kLineData.open) {
				color = modifyAlpha(styles.bars[0].upColor, 0.3)
			} else if (kLineData.close < kLineData.open) {
				color = modifyAlpha(styles.bars[0].downColor, 0.3)
			} else {
				color = modifyAlpha(styles.bars[0].noChangeColor, 0.3)
			}
			const x = xAxis.convertToPixel(i)
			ctx.fillStyle = color
			const barStartY = height - (volume! / maxVolume) * maxBarHeight
			ctx.fillRect(x - barSpace.halfGapBar, barStartY, barSpace.gapBar, height - barStartY)
		}
		return false
	}
}

// @ts-expect-error ignore
function modifyAlpha (rgbaString, newAlpha: number) {
	// Extract the rgba components
	return rgbaString.replace(/rgba\((\d+), (\d+), (\d+), (.+)\)/, `rgba($1, $2, $3, ${newAlpha})`)
}

export default volumeBars
