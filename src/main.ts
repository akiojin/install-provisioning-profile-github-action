import * as core from '@actions/core'
import * as io from '@actions/io'
import * as os from 'os'
import * as tmp from 'tmp'
import * as path from 'path'
import * as fs from 'fs/promises';
import { BooleanStateValue, StringStateValue } from './StateHelper'

const IsMacOS = os.platform() === 'darwin'

const PostProcess = new BooleanStateValue('IS_POST_PROCESS')
const InstallPath = new StringStateValue('INSTALL_PATH')

async function Run()
{
	try {
		const base64 = core.getInput('base64')
		let pp = core.getInput('path')

		if (base64 !== '') {
			pp = tmp.fileSync().name
			await fs.writeFile(pp, Buffer.from(base64, 'base64'))
		} else if (pp === '') {
			throw new Error('base64 and path is null.')
		}

		const installDirectory = '~/Library/MobileDevice/Provisioning\ Profiles'
		const installPath = `${installDirectory}/${path.basename(pp).split('.')[0]}.mobileprovision`

		core.info(`Create Directory=${installDirectory}`)
		await io.mkdirP(installDirectory)
		core.info(`cp: ${pp} --> ${installPath}`)
		await io.cp(pp, installPath)

		InstallPath.Set(installPath)
	} catch (ex: any) {
		core.setFailed(ex.message)
	}
}

async function Cleanup()
{
	try {
		const installPath = InstallPath.Get()
		core.info(`rm: ${installPath}`)
		await io.rmRF(installPath)
	} catch (ex: any) {
		core.setFailed(ex.message)
	}
}

if (!IsMacOS) {
	core.setFailed('Action requires macOS agent.')
} else {
	if (!!PostProcess.Get()) {
		Cleanup()
	} else {
		Run()
	}
	
	PostProcess.Set(true)
}
