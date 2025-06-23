type PageName = 'welcome' | 'setup' | 'game'
type Players = { [id: string]: { name: string } }
type Team = { playerIDs: string[]; side: 'solid' | 'stripe' | null }
type Teams = { one: Team; two: Team }
