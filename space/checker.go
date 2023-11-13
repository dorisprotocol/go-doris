package space

import (
	"unsafe"

	"golang.org/x/sys/windows"
)

type (
	Checker interface {
		Check() (CheckResult, error)
	}

	defaultChecker struct {
		dataDir string
	}

	CheckResult struct {
		AvailableBytes uint64
		TotalBytes     uint64
	}
)

func NewChecker(dir string) Checker {
	return defaultChecker{dir}
}

func (c defaultChecker) Check() (CheckResult, error) {
	var freeBytesAvailableToCaller, totalNumberOfBytes, totalNumberOfFreeBytes int64

	// Convert the directory path to UTF-16
	dirPath, err := windows.UTF16PtrFromString(c.dataDir)
	if err != nil {
		return CheckResult{}, err
	}

	// Use GetDiskFreeSpaceEx to get disk information
	if err := windows.GetDiskFreeSpaceEx(
		dirPath,
		(*uint64)(unsafe.Pointer(&freeBytesAvailableToCaller)),
		(*uint64)(unsafe.Pointer(&totalNumberOfBytes)),
		(*uint64)(unsafe.Pointer(&totalNumberOfFreeBytes)),
	); err != nil {
		return CheckResult{}, err
	}

	return CheckResult{
		AvailableBytes: uint64(freeBytesAvailableToCaller),
		TotalBytes:     uint64(totalNumberOfBytes),
	}, nil
}
