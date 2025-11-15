import { useCallback, useState } from "react"

export function useMyState<T extends object>(args: T) {
	const [state, setState] = useState<T>(args)

	const setData = useCallback((path: string, value: unknown) => {
		setState((state) => updateData(state, path, value))
	}, [])

	return [state, setData] as const
}

function updateData<T extends object>(
	data: T,
	path: string,
	value: unknown,
): T {
	const keys = path.trim().split(".")

	return builder(data, 0, keys, value)
}

function builder<T extends object>(
	data: T,
	index: number,
	keys: string[],
	value: unknown,
): T {
	const key = keys[index] as keyof T & string

	if (isArrayKey(key)) {
		const { arrayIndex, arrayKey, filterKey, filterValue } =
			parseArrayKey<T>(key)

		const arr = Array.isArray(data[arrayKey as keyof T])
			? [...(data[arrayKey as keyof T] as Record<string, unknown>[])]
			: []

		let findItemIndex = arrayIndex

		if (filterKey != null) {
			const found = arr.findIndex(
				// biome-ignore lint/suspicious/noExplicitAny: I'll fix later
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
				(item) => item?.[filterKey as any] === filterValue,
			)
			if (found !== -1) findItemIndex = found
		}

		if (index === keys.length - 1) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			arr[findItemIndex] = value as any

			return {
				...data,
				[arrayKey]: arr,
			}
		}

		arr[findItemIndex] = builder(
			arr[findItemIndex] ?? {},
			index + 1,
			keys,
			value,
		)

		return {
			...data,
			[arrayKey]: arr,
		}
	}

	if (index === keys.length - 1) {
		return {
			...data,
			[key]: value,
		}
	}

	return {
		...data,
		[key]: builder(data[key] ?? {}, index + 1, keys, value),
	}
}

function parseArrayKey<T>(key: string) {
	const raw = key.trim().slice(1, -1)

	const commaIndex = raw.indexOf(",")
	const arrayKey =
		commaIndex === -1 ? raw.trim() : raw.slice(0, commaIndex).trim()

	let rest = commaIndex === -1 ? "" : raw.slice(commaIndex + 1).trim()

	let filterValue = null
	let filterKey: keyof T = null as unknown as keyof T
	let arrayIndex = 0

	const conditionCheckStart = rest.indexOf("(")
	const conditionCheckEnd = rest.indexOf(")")

	let condition = ""

	if (conditionCheckEnd !== -1 && conditionCheckStart !== -1) {
		condition = rest.slice(conditionCheckStart + 1, conditionCheckEnd)
		rest = rest.slice(0, conditionCheckStart).trim()
	}

	if (condition.includes(":")) {
		const colonPosition = condition.indexOf(":")
		filterKey = condition.slice(0, colonPosition) as keyof T
		filterValue = JSON.parse(condition.slice(colonPosition + 1).trim())
	}

	if (rest === "last") {
		arrayIndex = -1
	} else if (rest) {
		arrayIndex = JSON.parse(rest)
	}

	return { filterKey, filterValue, arrayKey, arrayIndex }
}

function isArrayKey(k: string) {
	return k.includes("[")
}
