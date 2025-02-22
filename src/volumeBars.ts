/*
 * This file is part of ChartSpire.
 *
 * ChartSpire is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ChartSpire is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with ChartSpire. If not, see <https://www.gnu.org/licenses/>.
 */

import { IndicatorDefinition } from 'chartspire'

// @eslint-next-line @typescript-eslint/no-unused
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
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
			// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
			values: [{ title: '', value: { text: result[dataIndex!] || 'n/a', color } }]
		}
	},
	draw: ({ ctx, kLineDataList, bounding, visibleRange, barSpace, defaultStyles, xAxis }) => {
		const { from, to } = visibleRange
		const result = kLineDataList.map(kLineData => kLineData.volume)
		// const result = indicator.result ! Does not work for some reason
		let maxVolume = Number.MIN_SAFE_INTEGER
		for (let i = from; i < to; i++) {
			const volume = result[i]
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			maxVolume = Math.max(volume!, maxVolume)
		}
		const height = bounding.height
		const maxBarHeight = height / 4
		ctx.globalCompositeOperation = 'destination-over'
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function modifyAlpha (rgbaString, newAlpha: number) {
	// Extract the rgba components
	return rgbaString.replace(/rgba\((\d+), (\d+), (\d+), (.+)\)/, `rgba($1, $2, $3, ${newAlpha})`)
}

export default volumeBars
