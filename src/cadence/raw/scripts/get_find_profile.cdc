import Profile from 0xProfile
import FIND from 0xFIND

pub fun main(address: Address) : Profile.UserReport? {
	let account = getAccount(address)
	if account.balance == 0.0 {
        log("Zero balance profile return")
		return nil
	}

	var profileReport = account
		.getCapability<&{Profile.Public}>(Profile.publicPath)
		.borrow()?.asReport()

	if profileReport != nil && profileReport!.findName != FIND.reverseLookup(address) {
		profileReport = Profile.UserReport(
			findName: "",
			address: profileReport!.address,
			name: profileReport!.name,
			gender: profileReport!.gender,
			description: profileReport!.description,
			tags: profileReport!.tags,
			avatar: profileReport!.avatar,
			links: profileReport!.links,
			wallets: profileReport!.wallets, 
			following: profileReport!.following,
			followers: profileReport!.followers,
			allowStoringFollowers: profileReport!.allowStoringFollowers,
			createdAt: profileReport!.createdAt
		)
	}

	return profileReport
}
 