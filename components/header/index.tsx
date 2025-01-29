import React from 'react'
import { View } from 'react-native'
import { AppText } from '../typography'

interface IProps {
    title: string
    subTitle?: string
}

export default function AppHeader({ title, subTitle }: IProps) {
  return (
    <View className='px-5 py-3'>
        <AppText font='bold' size='2xl'>{title}</AppText>
        {subTitle && (
            <AppText size='sm' font='semibold'>
                {subTitle}
            </AppText>
        )}
    </View>
  )
}
